const mapStateToProps = (component) => {
  return (state: { value: any; page: any; user: any; email: any }) => {
    return {
      value: state.value,
      page: state.page,
      user: state.user,
      email: state.email,
    };
  };
};

export default mapStateToProps;
