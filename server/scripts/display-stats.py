test_string = "this is text that should be read"

from nltk import pos_tag
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.probability import FreqDist
from nltk.corpus import cmudict

# TODO: what is the difference between most_common and frequencies ?
# TODO: document functions and define current standings for pre and post conditions

def text_input(data):
    text = input()
    data.update(text=text)
    return


def get_tokens(data):
    # TODO: refine or replace tokenizers
    # TODO: add as default tokenizer when fields missing in dictionary
    text = data.get('text')
    sent_tokens = sent_tokenize(text)
    word_tokens = word_tokenize(text)
    data.update(sent_tokens=sent_tokens, word_tokens=word_tokens)
    return


def get_avg_word_len(data):
    # TODO: add punctuation filter?
    word_tokens = data.get('word_tokens')
    word_count = len(word_tokens)
    char_count = len("".join(word_tokens))
    avg_word_len = char_count / word_count
    data.update(avg_word_len=avg_word_len)
    return


def get_avg_sent_len(data):
    # TODO: check for desired valid character considerations
    sent_tokens = data.get('sent_tokens')
    sent_count = len(sent_tokens)
    sent_word_count = len("".join(sent_tokens))
    avg_sent_len = sent_count / sent_word_count
    data.update(avg_sent_len=avg_sent_len)
    return


def get_most_common_words(data, num):
    word_tokens = data.get('word_tokens')
    freq_dist = FreqDist(word.lower() for word in word_tokens)
    most_common_words = freq_dist.most_common(num)
    data.update(most_common_words=most_common_words)
    return


def get_word_distributions(data):
    word_tokens = data.get('word_tokens')
    word_distributions = dict()
    for index, word in enumerate(word_tokens):
        word_distributions[word] = [
            *(word_distributions.get(word) or []), index]
    data.update(word_distributions=word_distributions.items()[0])
    return


def get_avg_sylb_len(data):
    # TODO: clean and check for inconsistencies 
    d = cmudict.dict()
    word_tokens = data.get('word_tokens')
    word_len = len(word_tokens)
    syllables = 0
    for word in word_tokens:
        definition = d.get(word.lower(), "")
        if (definition):
            for syllabicate in definition[0]:
                if (syllabicate[-1].isdigit()):
                    syllables += 1
        else:
            word_len -= 1
    avg_sylb_len = syllables / word_len
    data.update(avg_sylb_len=avg_sylb_len)
    return


def get_readability_value(data):
    ASL = data.get('avg_sent_len')
    ASW = data.get('avg_sylb_len')
    readability_value = 206.835 - (1.015 * ASL) - (84.6 * ASW)
    data.update(readability_value=readability_value)
    return

def get_pos_tags(data):
    word_tokens = data.get('word_tokens')
    pos_tags = pos_tag(word_tokens)
    data.update(pos_tags=pos_tags)
    return


def pipeline(data):
    # TODO: add field check for out of order use cases
    text_input(data)
    get_tokens(data)
    get_avg_word_len(data)
    get_avg_sent_len(data)
    get_most_common_words(data, 20)
    # get_word_distributions(data)
    get_avg_sylb_len(data)
    get_readability_value(data)
    get_pos_tags(data)
    return

def error_pipeline(data, pipeline):
    # TODO: need a pipeline aggregation style
    # that handles errors in each method piped
    # TODO: add async processing to the sub-process,
    # TODO: can be partially multicore
    for function in pipeline:
        function(data)
    return

def main():
    data = dict()
    pipeline(data)
    print(data)
    return


if __name__ == '__main__':
    main()
