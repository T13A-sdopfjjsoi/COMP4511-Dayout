// styles.js
const UIStyles = {
  backButton: {
    position: "absolute",
    top: 40,
  },
  titleText: {
    fontSize: 30,
    color: "white",
  },
  blackTitleText: {
    fontSize: 30,
    color: 'black',
  },
  header: {
    paddingTop: 60,
    padding: 20,
    backgroundColor: "#63519f",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  loginSignUp: {
    justifyContent:"space-between",
    flexDirection: "row",
    alignItems: "center",
    padding:50,
  },
  button: {
    marginRight: 10,
  },
  dashContent: {
    marginLeft: 10,
    marginTop: 10,
  },
  scrollStackItem: {
    marginRight: 10,
    width: 120,
    height: 150,
    flexDirection:"row"
  },
  stack: {
    aspectRatio: 1,
    width: "100%",
    backgroundColor:"#c9c9c9",
    borderRadius: 20,
    flexDirection:"row",
    flexWrap:"wrap",
    overflow: "hidden"
  },

  searchCard: {
    width: "100%",
    height: 180,
    marginBottom: 5,
  },
};

export default UIStyles;
