import { Card } from 'react-bootstrap';

function PayloadDetails({ payload }) {
  if (payload) {
    return (
      <div className="payload">
        <Card>
          <Card.Body>
            <Card.Title>HTTP Request</Card.Title>
            <pre>
              <code className="language-json">
                {JSON.stringify(payload, null, 2)}
              </code>
            </pre>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default PayloadDetails;

///We just need to retrieve from the database
