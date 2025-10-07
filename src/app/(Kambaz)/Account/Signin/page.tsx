import { Form } from "react-bootstrap";
import Link from "next/link";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Signin</h3>
      <Form>
        <Form.Control
          id="wd-username"
          placeholder="username"
          className="wd-username mb-3"
        />
        <Form.Control
          id="wd-password"
          placeholder="password"
          type="password"
          className="wd-password mb-3"
        />
        <Link
          id="wd-signin-btn"
          href="/Dashboard"
          className="btn btn-primary w-100 mb-2"
        >
          Signin
        </Link>
        <Link id="wd-signup-link" href="/Account/Signup">
          Signup
        </Link>
      </Form>
    </div>
  );
}
