import User from '../../models/Users';
import bluebird from 'bluebird';
import fs from 'fs';

const userJson = __dirname + '/users.json'

export function init() {
    
    bluebird.coroutine(function* () {

        yield User.deleteMany(() => {
            console.log("Previous Users seed is deleted")
        });

        fs.readFile(userJson, 'utf8', (err, jsonString) => {
            if (err) {
                console.error(err)
                throw new Error(err);
            }
            const jsonData = JSON.parse(jsonString)

            jsonData.map((user) => {
                new User({
                    _id: user._id,
                    username: user.username,
                    email:user.email,
                    date_created: user.date_created,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    hashed_password: user.hashed_password,
                    isActive: user.isActive,
                    salt: user.salt,
                    roles: user.roles,
                }).save()
            })
            console.log("user Seeding completed");
        })
    })().catch((err) => {
        console.log(err);
    })
}