const algoliasearch = require("algoliasearch");

export const algoliaSearch = async (keyword) => {
    console.log("Calling Alo")
    const client = algoliasearch("7EB06J0NHJ", "4390c38b477d048985e88b4baacedefb");
    const index = client.initIndex("country_search");
    try{
        const response = index.search(keyword)
        return response
    }catch(e){
        return {error: JSON.stringify(e)}
    }

}