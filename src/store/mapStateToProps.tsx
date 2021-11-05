const mapStateToProps = (component) => {
  return (state: { value: any }) => {
    return { value: state.value };
  };
};

export default mapStateToProps;
