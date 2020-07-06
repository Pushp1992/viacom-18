import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

// Custom component
import EnsemblService from '../../utils/service';
import CustomToastr from '../../utils/toastr';
import Header from '../Header/header'
import "../GeneList/list.css";

class GeneList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geneSymbol: '',
            proteinPos: '',
            aminoAcid: '',
            loading: false,
            fetchedGeneList: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    }

    componentDidMount() {
        let geneListFromLocal = localStorage.getItem("geneList");
        this.setState({fetchedGeneList: JSON.parse(geneListFromLocal)})
    }

    getGeneInformation = (event) => {
        event.preventDefault();

        this.setState({ loading: true });
        let params = this.state;
        const getGeneList = EnsemblService.getEnsemblData(params);
        getGeneList.then(response => {
            try {
                if (response && response[1].members.length !== 0) {
                    let fetchedResponse =  response[1].members;

                    localStorage.setItem("geneList", JSON.stringify(fetchedResponse));
                    this.setState({ fetchedGeneList:fetchedResponse, loading: false });
                    CustomToastr.success("Data fetched Successfully !");
                    console.log(this.state.fetchedGeneList);
                } else {
                    this.setState({ loading: false });
                    CustomToastr.error("Unable to get data for created request")
                }
            } catch (err) {
                this.setState({ loading: false })
                console.log(err)
            }
        })
    }

    render() {
        const geneList = this.state.fetchedGeneList;
        const options = {
            noDataText: this.state.loading ? <h1 style={{ margin: "200px 0" }}>Fetching Gene details.
            <br /> <Spinner animation="grow" size="lg" variant="success" /></h1> : undefined,
            paginationSize: 5,
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            paginationPosition: 'bottom',
        }
        return (
            <Container fluid>
                <Row id="header">
                    <Header />
                </Row>
                <br />
                <Row id="text-fields">
                    <Col sm={3}>
                        <input type="text" name="geneSymbol" value={this.state.geneSymbol}
                            onChange={this.handleChange} placeholder="enter gene symbol e.g. BRAF" />
                    </Col>
                    <Col sm={3}>
                        <input type="text" name="proteinPos" value={this.state.proteinPos}
                            onChange={this.handleChange} placeholder="enter position in a protein sequence e.g. 600" />
                    </Col>
                    <Col sm={3}>
                        <input type="text" name="aminoAcid" value={this.state.aminoAcid}
                            onChange={this.handleChange} placeholder="enter amino acid letter e.g. V" />
                    </Col>
                    <Col>
                        <Button name="geneInfo" variant="info" onClick={(event) => this.getGeneInformation(event)}>Get Gene Info</Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <div id="listing">
                        <BootstrapTable
                            key={this.state.sizePerPage}
                            data={geneList}
                            options={options}
                            pagination={true}
                            version='4' keyBoardNav striped hover>

                            <TableHeaderColumn dataField='gene_stable_id' isKey={true} dataFormat={(cell, row) => <Link to={`/gene-details?gene_stable_id=${row.gene_stable_id}`}>{row.gene_stable_id}</Link>}>
                                Gene Stable ID
                        </TableHeaderColumn>
                            <TableHeaderColumn dataField='source_name'>Source Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='genome' filter={{ type: 'TextFilter', placeholder: 'search by Genome value' }}>Genome</TableHeaderColumn>
                            <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </Row>
            </Container>
        )
    }
}

export default GeneList;