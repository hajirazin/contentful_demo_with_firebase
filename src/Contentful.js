const contentful = require('contentful')
const chalk = require('chalk')

const SPACE_ID = '***'
const ACCESS_TOKEN = '***'

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: SPACE_ID,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: ACCESS_TOKEN
})

const getCourses = (userId) => {
    return client.getEntries({
            content_type: "course",
            "fields.uid": userId
        })
        .then((response) => response.items.map(i => i.fields))
        .catch((error) => {
            console.log(chalk.red(`\nError occurred while fetching Entries for ${chalk.cyan('course')}:`))
            console.error(error)
        })
}
export default getCourses