import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    '@media ios': {
      paddingTop: 30,
    },
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  button1: {
    alignSelf: 'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },

  button2: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  icon1: {
    width: 18,
  },
  icon2: {
    width: 20,
  },
});
