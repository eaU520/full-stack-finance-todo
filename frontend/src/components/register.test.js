import {fireEvent, render, screen, cleanup, renderWithRouter } from "@testing-library/react";
import '@testing-library/jest-dom'
import {BrowserRouter} from "react-router-dom";
import RegisterComponent from './RegisterUser';
import act from "react";
import React from "react";

afterEach(() => {
    cleanup()
});

describe("Register Component renders", () =>{
    it("Attempting to create a new user with valid inputs", () =>{
        const user ={
            name: "Test Name",
            username: "testerman",
            password:"Test",
            passwordAgain:"Test",
            admin: false,
            email: "test@hotmail.com"
        }
        const submit = jest.fn();

        render(
            <BrowserRouter>
                <RegisterComponent onSubmit={submit} body={user} />
            </BrowserRouter>
        );
        const nameField = screen.getByPlaceholderText("Name");
        fireEvent.change(nameField, {target: {value: user.name }});
        //TODO: Every user field, but it gets cleared
        const submitButton = screen.getByRole("button");
        fireEvent.click(submitButton);

        expect(submit).toHaveBeenCalledWith({user});

    });
});