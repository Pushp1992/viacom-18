import axios from 'axios';

const EnsemblService = {

    async getEnsemblData(param) {
        const encodedURI = window.encodeURI(`/proxy/family/member/symbol/homo_sapiens/${param.geneSymbol}?sequence=protein&target_taxon=${param.proteinPos}`);

        try {
            return await axios({
                method: "GET",
                url: encodedURI,
                "headers": {
                    'Content-Type': "application/json",
                    "SERVER": "GENE"
                }
            }).then(function (response) {
                return response.data
            })
        } catch (error) {
            console.error(error)
        }
    },
    async getGeneData(id) {
        const encodedURI = window.encodeURI(`/proxy/family/member/id/${id}?`);

        try {
            return await axios({
                method: "GET",
                url: encodedURI,
                "headers": {
                    'Content-Type': "application/json",
                    "SERVER": "GENE"
                }
            }).then(function (response) {
                return response.data
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export default EnsemblService;