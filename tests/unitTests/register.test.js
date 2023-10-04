const { render } = require("@testing-library/react");
const registerComponent = require("../../frontend/src/components/RegisterUser");
test("Register Component renders", () =>{
    expect(registerComponent);
});
describe("Attempting to create new users", () =>{
    render(registerComponent);
    test("New user", async () =>{
        const user ={
            name: "Test Name",
            username: "testerman",
            password:"Test",
            passwordAgain:"Test",
            admin: false,
            email: "test@hotmail.com"
        }
        const newUser = await registerComponent.CreateUser(user);
        expect(newUser).toEqual(expect.objectContaining(newUser));
    });
});