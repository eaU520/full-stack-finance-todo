import {fireEvent, render, screen } from "@testing-library/react";
import RegisterComponent from "../../frontend/src/components/RegisterUser";


afterEach(cleanup);

describe("Register Component renders", () =>{
    test("Attempting to create a new user with valid inputs", () =>{
        const user ={
            name: "Test Name",
            username: "testerman",
            password:"Test",
            passwordAgain:"Test",
            admin: false,
            email: "test@hotmail.com"
        }
        const submit = jest.fn();

        render(<RegisterComponent onSubmit={submit} body={user}/>);
        const nameField = screen.getByPlaceholderText("Name");
        fireEvent.change(nameField, {target: {value: user.name }});
        //TODO: Every user field, but it gets cleared
        const submitButton = screen.getByRole("button");
        fireEvent.click(submitButton);

        expect(submit).toHaveBeenCalledWith({user});

    });
});