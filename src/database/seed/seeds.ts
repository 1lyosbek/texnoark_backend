import { connectionSource } from "src/common/config/database.config";
import { RoleEnum } from "src/common/enums/enums";
import { hashed } from "src/lib/bcrypt";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { createConnection, DataSource } from "typeorm"



(async () => {
    const connection: DataSource = await createConnection(connectionSource);

    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

        ////////Creating SuperAdmin///////

        const userRepository = queryRunner.manager.getRepository(UserEntity);
        const users = await userRepository.find();
        await userRepository.remove(users);
        const newUser = new UserEntity();
        newUser.first_name = "Arslonbek",
        newUser.last_name = "Roziboyev",
        newUser.phone_number = "+998950192469",
        newUser.role = RoleEnum.SUPERADMIN,
        newUser.email = "arslonbek@gmail.com",
        newUser.password = await hashed("password");
        await userRepository.save<UserEntity>(newUser);
        await queryRunner.commitTransaction();
    } catch (err) {
        console.log("error", err);
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
})();
