import bcrypt from "bcryptjs";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await userRepository.find();
}

async function getById(id: number) {
    return await getUser(id);
}

async function create(params: any) {
    if (await userRepository.findOne({ where: { email: params.email } })) {
        throw new Error(`Email "${params.email}" is already registered`);
    }

    // Explicitly create a new User instance
    const user = new User();
    Object.assign(user, params);

    if (params.password) {
        user.passwordHash = await bcrypt.hash(params.password, 10);
    }

    return await userRepository.save(user);
}

async function update(id: number, params: any) {
    const user = await getUser(id);
    Object.assign(user, params);

    if (params.password) {
        user.passwordHash = await bcrypt.hash(params.password, 10);
    }

    return await userRepository.save(user);
}

async function _delete(id: number) {
    const user = await getUser(id);
    return await userRepository.remove(user);
}

async function getUser(id: number) {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new Error("User not found");
    return user;
}
