import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";

import { malCategories } from "../../constants";
import { Anime } from "../../types";
import { MalCategoryId } from "../../types";

interface AnimeCardProps {
  anime: Anime;
}

function AnimeCard({ anime } : AnimeCardProps ) {
  return (
    <Card className="mb-3">
      <Row className="g-2">
        <ImageSection anime={anime} />
        <MainSection anime={anime} />
        <DetailsSection anime={anime} />
      </Row>
    </Card>
  );
}

function ImageSection({ anime } : AnimeCardProps) {
  return (
    <Col md={2}>
      <Card.Img alt={anime.name} className="h-100" src={anime.imageUrl} />
    </Col>
  );
}

function MainSection({ anime } : AnimeCardProps) {
  return (
    <Col md={8}>
      <Card.Body >
        <Title anime={anime} />
        <Genres anime={anime} />
        <Synopsis anime={anime} />
      </Card.Body>
    </Col>
  );
}


function Title ( {anime} : AnimeCardProps ) {
  return (
    <Row >
      <Card.Title>
        <Card.Link href={anime.malUrl} target="_blank" className="text-reset text-decoration-none">{anime.name}</Card.Link>
      </Card.Title>
    </Row>
  );
}


function Genres ( {anime} : AnimeCardProps ) {
  return (
    <Row className="py-1">
      <div className="d-flex flex-padding">
        {anime.genres.map((genre) => ( <Genre genre={genre} />))}
      </div>
    </Row>
  )
}


function Genre ( {genre} : { genre: MalCategoryId } ) {
  return ( 
    <Badge key={genre} bg="custom-blue" className="mr-1 rounded align-items-center px-2 gap-2">
      {malCategories[genre]}
    </Badge>
  );
}

function Synopsis ( {anime} : AnimeCardProps ) {
  return (
    <Row>    
      <Card.Text className="text-truncate-container">
        {anime.synopsis}
      </Card.Text>
    </Row>
  )
}

function DetailsSection({ anime } : AnimeCardProps) {
  return (
    <Col
      className="d-flex justify-content-center pe-4"
      md={2} 
    >
      <Card.Body>
      <Row >
        <Badge bg="success" pill>
          Plan to Watch
        </Badge>
      </Row>
      <Row>
        Text 
      </Row>

      </Card.Body>
    </Col>
  );
}

export default AnimeCard;
