import json
from pulp import *


class Optimizer:
    def __init__(self):
        self.data = None
        self.names = None
        self.stocks = None
        self.problem = None
        self.variables = None

    def parse(self, dump):
        self.data = json.loads(dump)
        self.stocks = self.data["stocks"]
        self.names = list(map(lambda x: x[0], self.stocks))
        self.problem = LpProblem("op", LpMaximize)

    def op1a(self):
        self.variables = LpVariable.dicts("stock", self.names, 0, 1, LpInteger)
        self.problem += lpSum([
            self.stocks[i][1] * self.variables[self.names[i]]
            for i in range(len(self.names))
        ])

        self.problem += lpSum([
            self.stocks[i][2] * self.variables[self.names[i]]
            for i in range(len(self.names))
        ]) <= self.data["startingCapital"]
        return self.solve()

    def op1b(self):
        self.variables = LpVariable.dicts("stock",
                                          self.names,
                                          lowBound=1,
                                          upBound=None,
                                          cat=LpInteger)
        self.problem += lpSum([
            self.stocks[i][1] * self.variables[self.names[i]]
            for i in range(len(self.names))
        ])

        self.problem += lpSum([
            self.stocks[i][2] * self.variables[self.names[i]]
            for i in range(len(self.names))
        ]) <= self.data["startingCapital"]
        return self.solve()

    def op1c(self):
        self.variables = LpVariable.dicts("stock",
                                          self.names,
                                          lowBound=0,
                                          cat=LpInteger)
        self.problem += lpSum([
            self.stocks[i][1] * self.variables[self.names[i]]
            for i in range(len(self.names))
        ])

        self.problem += lpSum([
            self.stocks[i][2] * self.variables[self.names[i]]
            for i in range(len(self.names))
        ]) <= self.data["startingCapital"]
        return self.solve()

    def op2(self):
        self.variables = LpVariable.dicts("stock",
                                          self.names,
                                          upBound=1,
                                          cat=LpInteger)
        self.problem += lpSum([
            self.stocks[i][1] * self.variables[self.names[i]]
            for i in range(len(self.names))
        ])

        self.problem += lpSum([
            self.stocks[i][2] * self.variables[self.names[i]]
            for i in range(len(self.names))
        ]) <= self.data["startingCapital"]

        self.problem += lpSum([
            self.stocks[i][3] * self.variables[self.names[i]]
            for i in range(len(self.names))
        ]) <= self.data["risk"]

        return self.solve()

    def solve(self):
        self.problem.solve()
        if self.problem.status != LpStatusOptimal:
            return {"profit": 0, "portfolio": []}

        port = []
        for v in self.problem.variables():
            for i in range(int(v.varValue)):
                port.append(v.name.split("_")[1])

        return json.dumps({
            "profit": int(value(self.problem.objective)),
            "portfolio": port
        })
