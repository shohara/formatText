// lodashからdebounce関数を取得
const debounce = _.debounce;

new Vue({
    el: "#app",
    data: {
        inputText: "",
        outputText: "",
        abbreviations: { "et al.": "達", "Sec.": "セクション", "Fig.": "図" },
    },
    watch: {
        inputText: function (newText) {
            // debounce関数を使用して入力の変更後500ミリ秒待ってからテキスト処理を開始
            debounce(() => {
                this.outputText = this.processText(newText);
            }, 500)();
        },
    },
    methods: {
        processText: function (text) {
            // Replace newlines with spaces
            text = text.replace(/\n/g, " ");

            // Replace abbreviations
            for (var abbr in this.abbreviations) {
                // Create a regular expression that matches the abbreviation
                var re = new RegExp(abbr, "g");

                // Replace all occurrences of the abbreviation
                text = text.replace(re, this.abbreviations[abbr]);
            }

            // Split into sentences
            var sentences = text.split(
                /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/g
            );

            // Replace abbreviations back and join sentences
            for (var i = 0; i < sentences.length; i++) {
                for (var abbr in this.abbreviations) {
                    // Create a regular expression that matches the abbreviation
                    var re = new RegExp(this.abbreviations[abbr], "g");

                    // Replace all occurrences of the abbreviation
                    sentences[i] = sentences[i].replace(re, abbr);
                }
            }

            return sentences.join("\n\n");
        },
    },
});
