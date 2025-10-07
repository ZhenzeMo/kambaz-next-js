import { Form } from "react-bootstrap";
import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h3>Signup</h3>
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
        <Form.Control
          id="wd-password-verify"
          placeholder="verify password"
          type="password"
          className="wd-password-verify mb-3"
        />
        <Link
          id="wd-signup-btn"
          href="/Account/Profile"
          className="btn btn-primary w-100 mb-2"
        >
          Signup
        </Link>
        <Link id="wd-signin-link" href="/Account/Signin">
          Signin
        </Link>
      </Form>
    </div>
  );
}

