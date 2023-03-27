import React, { useState } from "react";
import { Stack, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <Stack direction="horizontal">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search products..."
          className="ms-sm-5 me-sm-2"
        ></Form.Control>
        <Button type="submit" variant="outline-success">
          Search
        </Button>
      </Stack>
    </Form>
  );
};

export default SearchBox;
