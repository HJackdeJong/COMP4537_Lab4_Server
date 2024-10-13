class Dictionary{
    constructor(){
        this.dictionary = {}
        this.wordCount = 0;
    }

    retrieveDefinition(word) {
        return this.dictionary[word] || null;
    }

    addWord(word,definition){
        if (this.dictionary[word]){
            return { success: false};
        } else {
            this.dictionary[word] = definition;
            this.wordCount++;
            return {success: true};
        }
    }

    getWordCount(){
        return this.wordCount;
    }
}

module.exports = Dictionary;

