const fs = require('fs')

class Container {
    constructor(file) {
        this.file = file
    }

    async save(obj) {
        try {
            const objects = await this.getAllObjects()
            const lastId = objects.length > 0 ? objects[objects.length - 1].id : 0
            const newId = lastId + 1
            const newObj = { id: newId, ...obj }
            objects.push(newObj)
            await this.saveObjects(objects)
            return newId

        } catch (error) {
            throw new Error('Error saving object')
        }
    }

    async getById(id) {
        try {
            const objects = await this.getAllObjects()
            const obj = objects.find((o) => id === id)
            return obj || null

        } catch (error) {
            throw new Error('Error obtaining ID')
        }
    }

    async getAll() {
        try {
            const objects = await this.getAllObjects()
            return objects

        } catch (error) {
            throw new Error('Error obtaining objects')
        }
    }

    async deleteById(id) {
        try {
            let objects = await this.getAllObjects()
            objects = objects.filter((o) => o.id !== id)
            await this.saveObjects(objects)

        } catch (error) {
            throw new Error('Error deleting object')
        }
    }


    async deleteAll() {
        try {
            await this.saveObjects([])
        } catch (error) {
            throw new Error('Error deleting objects')
        }
    }

    async getAllObjects() {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            return data ? JSON.parse(data) : []
        } catch (error) {
            return []
        }
    }

    async saveObjects(objects){
        try{
            await fs.promises.writeFile(this.file, JSON.stringify(objects, null, 2))
        }catch (error){
            throw new Error ('Error saving objects')
        }
    }
}

const main = async ()=> {
    const products = new Container ("products.txt")


//obtain object by id //
const obj = await products.getById(2)
console.log ('Object obtained',obj)

//save object//
/*     const id = await products.save(
        {title:'Item 1', price:60, thumbnail:'./imgItem1.jpg'}
    )
    console.log('Object saved with ID:', id)

 */
/* //obtain all objects//
const getAllObjects = await products.getAll()
console.log('Objects saved', getAllObjects)
 */

/* //delete an object//
await products.deleteById(1)
console.log('Object deleted')
 */
}

main().catch((error)=> console.error(error))