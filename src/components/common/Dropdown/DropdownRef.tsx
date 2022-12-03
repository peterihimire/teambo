import usePopperDropdown from "../../../utils/hooks/usePopperDropdown";

const DropdownRef = () => {
  const {
    setReferenceRef,
    setPopperRef,
    styles,
    attributes,
    handleDropdownClick,
  visible,
  } = usePopperDropdown();

  const DropdownContainer: React.FC = ({ children }) => {
    return (
      <>
        {visible && (
          <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
            <div style={styles.offset}>{children}</div>
          </div>
        )}
      </>
    );
  };
  const DropdownItem: React.FC = ({ children }) => {
    return <>{children}</>;
  };
  const DropdownButton: React.FC = ({ children }) => {
    return (
      <div ref={setReferenceRef} onClick={handleDropdownClick}>
        {children}
      </div>
    );
  };

  return { DropdownContainer, DropdownItem, DropdownButton };
};

export default DropdownRef;
