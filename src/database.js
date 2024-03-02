import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
    #database = {};

    constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data);
        }).catch(() => {
            this.#persist();
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(table, search) {
        const data = this.#database[table] ?? [];

        if(search) {
            const filteredData = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase());
                })
            })
            return filteredData;
        }

        return data;
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }

        this.#persist();

        return data;
    }

    update(table, id, body) {
        const index = this.#database[table].findIndex(data => data.id == id);

        if (index > -1) {
            for (const key in body) this.#database[table][index][key] = body[key];
            this.#persist();
            return this.#response('Successfully updated!', false);
        }
        return this.#response('Id Not found in database!', true);
    }

    delete(table, id) {

        if (!Array.isArray(this.#database[table])) return this.#response('Empty table!', true);
        const initialLength = this.#database[table].length;
        this.#database[table] = (this.#database[table]).filter(data => {
            const d = id != data.id;
            return d;
        });
        const finalLength = this.#database[table].length;
        const deleted = initialLength != finalLength;
        if (deleted) this.#persist();
        return this.#response(deleted ? 'Successfully deleted!' : 'Id Not found in database!', !deleted);
    }


    #response(message, error) {
        return {
            message,
            error,
        }
    }
}