from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import json


analyzer = SentimentIntensityAnalyzer()


def analyse(sentences):
    result = list(map(lambda x: analyzer.polarity_scores(x), sentences))
    return list(map(lambda x: "positive" if x['compound'] > 0 else "negative", result))


if __name__ == "__main__":
    req = json.loads(input())
    result = analyse(req["reviews"])
    print(json.dumps({"response": result}))
