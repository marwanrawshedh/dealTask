import Button from "react-bootstrap/Button";

const ButtonComponent = ({ children, disabled = false, onClick }) => {
  return (
    <Button
      className="bg-blue-600"
      disabled={disabled}
      variant="primary"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
