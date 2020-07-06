import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const styles = {
    alignment: {
        height: '50px',
        backgroundColor: '#2874f0',
        color: "white",
        display: "flex",
        alignItems: "center",
        marginLeft: "20px"
    },
    backBtn: {
        // backgroundColor: "green",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}

function Header() {
    return (
        <Container fluid>
            <Row>
                <Col md="10">
                    <div style={styles.alignment}>
                        <label>VIACOM-18</label>
                    </div>
                </Col>
                <Col md="2">
                    <div style={styles.alignment}>
                    <Button variant="outline-danger">
                    <Link to={"/"} style={styles.backBtn}>Back</Link>
                    </Button>
                
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Header;