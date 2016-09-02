const fortunes = [
    "the first setence",
    "the second setence",
    "the third setence",
    "the fouth setence",
    "the five setence"
];

export default function getFortune(){
    var ids = Math.floor(Math.random() * fortunes.length);
    return fortunes[ids];
}
