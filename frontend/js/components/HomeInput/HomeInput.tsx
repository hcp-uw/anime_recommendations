import { KeyboardEvent, useState } from "react";
import { Badge, Button, Form, Nav, Row, Stack } from "react-bootstrap";

type UsernameProps = {
  user: string;
  removeUser: (name: string) => void;
};

// To-do: have multiple username colors
function Username({ user, removeUser }: UsernameProps) {
  return (
    <Badge
      key={user}
      bg="custom-pink d-flex rounded-pill align-items-center px-3 py-2 mx-1 gap-3"
      style={{ color: "#FDFDFD" }}
    >
      {user}
      <button
        aria-label="Close"
        className="btn-close ms-2 border-0"
        style={{
          color: "#FDFDFD",
          cursor: "pointer",
          backgroundColor: "transparent",
        }}
        type="button"
        onClick={() => removeUser(user)}
      >
        x
      </button>
    </Badge>
  );
}

function UsernameInput() {
  const [users, setUsers] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();
      if (!users.includes(input.trim())) {
        setUsers([...users, input.trim()]);
      }
      setInput("");
    }
  }

  function removeUser(user: string) {
    setUsers(users.filter((item) => item !== user));
  }

  return (
    <Form>
      <Form.Group
        className="mx-auto mt-3 text-center"
        style={{ width: "80vw" }}
      >
        <Form.Label>Enter MyAnimeList username(s)</Form.Label>
        <Stack className="form-control gap-1" direction="horizontal">
          {users.map((user) => (
            <Username key={user} removeUser={removeUser} user={user} />
          ))}
          <Form.Control
            className="border-0 shadow-none"
            style={{ fontSize: "20px", height: "2.5em" }}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Stack>
      </Form.Group>
    </Form>
  );
}

function GenerateButton() {
  return (
    <Button
      className="btn-custom mx-auto px-5"
      size="lg"
      style={{ color: "#FDFDFD" }}
      variant="button-c"
    >
      <Nav.Link href="/recs">Generate Recommendations</Nav.Link>
    </Button>
  );
}

export default function HomeInput() {
  return (
    <div className="d-grid gap-4">
      <Row>
        <UsernameInput />
      </Row>
      <Row className="mx-auto text-center">
        <GenerateButton />
      </Row>
    </div>
  );
}
