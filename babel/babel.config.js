/**
 * TODO: IE11에서도 동작하는 자바스크립트로 변환할수 있게 바벨을 구성하세요.
 */
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    ie: "11",
                },
                useBuiltIns: "usage",
                corejs: {
                    version: 2,
                }
            }
        ]
    ]
}
