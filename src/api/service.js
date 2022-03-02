/**
 * @typedef {object} PersonGroup
 * @property {string} name
 * @property {Person[]} persons
 */
/**
 * @typedef {object} Person
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} avatar
 * @property {string} position
 * @property {Comment[]} comments
 */
/**
 * @typedef {object} Comment
 * @property {number} id
 * @property {number} personId
 * @property {string} text
 * @property {string} createdAt
 */
/**
 * @typedef {object} ApiServiceOptions
 * @property {string} baseUrl
 */
export default class ApiService {
    /**
     * @param {ApiServiceOptions} options
     */
    constructor({ baseUrl = 'https://61adfd3ea7c7f3001786f510.mockapi.io/' } = {}) {     
        // Singleton
        if (!ApiService._instance) {
            this.options = { baseUrl };
            
            ApiService._instance = this;
        }
        return ApiService._instance;
    }
    /**
     * @returns {Promise.<Person[], Error>}
     */
    async getPersons() {
        const response = await fetch(this.options.baseUrl + 'person', {method: 'GET'})
        const persons = await response.json()
        
        const comments = await this.getComments()

        persons.forEach( person => {
          person.comments = comments.filter(comment => {
            // почему-то с бэка иногда приходит id не числом, 
            // а как "personId ..."
            const commentId = comment.personId.split(' ').length === 1 ? comment.personId : comment.personId.split(' ')[1]
            
            return +commentId === +person.id
          })
        } )
      
        return persons
    }
    /**
     * @returns {Promise.<Comment[], Error>}
     */
    async getComments() {
        const response = await fetch(this.options.baseUrl + 'comment', {method: 'GET'})

        return await response.json()
        // @TODO implement
    }
}
