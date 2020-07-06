import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';

// Custom component
import EnsemblService from '../../utils/service';
import CustomToastr from '../../utils/toastr';
import Header from '../Header/header';
import "../ViewPage/viewPage.css";

class ViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            family_stable_id: '',
            geneInfoList: [],
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    }

    componentDidMount() {
        var geneId = new URLSearchParams(this.props.location.search).get("gene_stable_id");

        if (geneId !== null) {
            this.getGeneDetails(geneId);
        } else { return };
    }

    getGeneDetails(geneId) {
        this.setState({ loading: true });

        if (this.state.geneInfoList.length === 0) {
            const getGeneById = EnsemblService.getGeneData(geneId);
            getGeneById.then(response => {
                try {
                    let resData = response[1];

                    if (response && resData.members.length !== 0) {
                        let initialList = [];
                        for (let i = 0; i < 1; i++) {
                            initialList.push(resData.members[i]);
                        }
                        this.setState({
                            geneInfoList: initialList,
                            description: resData.description,
                            family_stable_id: resData.family_stable_id,
                            loading: false
                        });

                        CustomToastr.success(`Gene for ID: ${geneId} fetched Successfully !`);
                        console.log(this.state.geneInfoList);
                    } else {
                        this.setState({ loading: false });
                        CustomToastr.error(`Unable to get data for ${geneId}`);
                    }
                } catch (err) {
                    this.setState({ loading: false })
                    console.log(err)
                }
            })
        }

    }

    render() {
        return (
            <Container fluid>
                <Row id="header">
                    <Header />
                </Row>
                {
                    this.state.loading ?
                        <Row id="text-fields">
                            <Col>
                                <div id="loader-style">
                                    <h3>Hold on ! getitng Gene Information</h3> {" "}
                                    <Spinner animation="grow" size="lg" variant="warning" /> {""}
                                    <Spinner animation="grow" size="lg" variant="success" />
                                </div>
                            </Col>
                        </Row>
                        :
                        <Container fluid>
                            <br/>
                            <Row>
                                <Col md="2" className="mainTxtLbl">Description:</Col>
                                <Col md="8" className="mainTxtData">{this.state.description}</Col>
                            </Row>
                            <Row>
                                <Col md="2" className="mainTxtLbl">Family Stable ID:</Col>
                                <Col md="8" className="mainTxtData">{this.state.family_stable_id}</Col>
                            </Row>
                            <br/> <br/>
                            <Row>
                                {
                                    this.state.geneInfoList.map(data => {
                                        return (
                                            <div key={data.gene_stable_id}>
                                                <Row>
                                                    <Col md="2" className="txtLbl">Description:</Col>
                                                    <Col md="10" className="txtData">{data.description}</Col>
                                                </Row>
                                                <Row>
                                                    <Col md="2" className="txtLbl">Genome:</Col>
                                                    <Col md="10" className="txtData">{data.genome}</Col>
                                                </Row>
                                                <Row>
                                                    <Col md="2" className="txtLbl">Source Name:</Col>
                                                    <Col md="10" className="txtData">{data.source_name}</Col>
                                                </Row>
                                                <Row>
                                                    <Col md="2" className="txtLbl">Protein Alignment:</Col>
                                                    <Col md="10" className="txtData">{data.protein_alignment}</Col>
                                                </Row>
                                            </div>
                                        )
                                    })
                                }
                            </Row>
                        </Container>
                }
            </Container>
        )
    }
}

export default withRouter(ViewPage);