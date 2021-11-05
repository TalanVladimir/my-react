const mapStateToProps = (component) => {
  return (state: { value: any; page: any }) => {
    return {
      value: state.value,
      page: state.page,
    };
  };
};

export default mapStateToProps;
