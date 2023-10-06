import { render, fireEvent, cleanup } from "@testing-library/react";
import RegisterComponent from "../../frontend/src/components/RegisterUser";


afterEach(cleanup);

test("Register Component renders", () =>{
    expect(<RegisterComponent/>);
});
describe("Attempting to create new users", () =>{
    const user ={
        name: "Test Name",
        username: "testerman",
        password:"Test",
        passwordAgain:"Test",
        admin: false,
        email: "test@hotmail.com"
    }

    render(<RegisterComponent data={{user}}/>);

    test("New user", async () =>{
        // const newUser = await registerComponent.CreateUser(user);
        // expect(newUser).toEqual(expect.objectContaining(newUser));
    });
});