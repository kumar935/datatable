const useScroll = require("./useScroll")
// @ponicode
describe("useScroll.default", () => {
    test("0", () => {
        let callFunction = () => {
            useScroll.default({ pagination: { type: "array" }, atBottom: { type: "array" }, atTop: { type: "string" }, rows: 3.0 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            useScroll.default({ pagination: { type: "number" }, atBottom: { type: "array" }, atTop: { type: "object" }, rows: 30 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            useScroll.default({ pagination: { type: "array" }, atBottom: { type: "object" }, atTop: { type: "object" }, rows: 0 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            useScroll.default({ pagination: { type: "array" }, atBottom: { type: "object" }, atTop: { type: "array" }, rows: 10 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            useScroll.default({ pagination: { type: "number" }, atBottom: { type: "number" }, atTop: { type: "string" }, rows: 3.0 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            useScroll.default({ pagination: {}, atBottom: undefined, atTop: {}, rows: Infinity })
        }
    
        expect(callFunction).not.toThrow()
    })
})
