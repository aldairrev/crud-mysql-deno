import { User } from "../interfaces/user.ts";
import * as UserRepository from "../repository/user.repository.ts";

const getUsers = async ({ request, response }: { request: any, response: any }) => {
    const result = await UserRepository.search();
    response.body = result.rows;
}

const getUser = async ({ params, response }: { params: any, response: any }) => {
    try {
        console.log(params);
        const userExists = await UserRepository.findById(params.id);

        if (userExists) {
            const result = await UserRepository.search(params);
            response.status = 200;
            response.body = result.rows;
        } else {
            response.status = 404;
            response.body = { message: "User not found" };
        }
    } catch (error) {
        console.log(error);
    }
}

const addUser = async ({ request, response }: { request: any, response: any }) => {
    const body = await request.body();
    const user: User = await body.value;

    if (user.name && user.country) {
        response.body = 200;
        response.body = await UserRepository.insert(user);
    } else {
        response.body = { message: "Invalid Request" };
        response.status = 400;
    }
}

const updateUser = async ({
    request,
    response,
    params,
}: {
    request: any;
    response: any;
    params: any;
}) => {
    const body = await request.body();
    const user: User = await body.value;
    console.log(user);

    try {
        const userExists = await UserRepository.findById(params.id);

        if (userExists) {
            response.status = 200;
            response.body = await UserRepository.update(user.name, user.country, params.id);
        } else {
            response.status = 4;
            response.body = { message: "User not found" };
        }
    } catch (error) {
        console.error(error);
    }
}

const deleteUser = async ({
    params,
    response
}: {
    params: any;
    response: any;
}) => {
    const userExists = await UserRepository.findById(params.id);
    if (userExists) {
        response.status = 200;
        response.body = await UserRepository.remove(params.id);
    } else {
        response.status = 404;
        response.body = { message: "User not found" };
    }
}

export {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
} 