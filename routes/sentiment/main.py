from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import nltk
import json


analyzer = SentimentIntensityAnalyzer()
nltk.download("punkt")


def analyse(paragraphs):
    result = list(map(lambda x: analyse_paragraph(x), paragraphs))
    return list(map(lambda x: "positive" if x > 0.5 else "negative", result))


def analyse_paragraph(paragraph):
    sentence_list = nltk.tokenize.sent_tokenize(paragraph)
    paragraphSentiments = 0.0
    for sentence in sentence_list:
        vs = analyzer.polarity_scores(sentence)
        # print("{:-<69} {}".format(sentence, str(vs["compound"])))
        paragraphSentiments += vs["compound"]

    return round(paragraphSentiments / len(sentence_list), 4)


if __name__ == "__main__":
    req = json.loads(input())
    result = analyse(req["reviews"])
    print(json.dumps({"response": result}))
