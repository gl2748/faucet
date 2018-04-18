import { connect } from 'react-redux';
import toJS from '../utils/to-js';
import Locale from '../components/Locale';

const mapStateToProps = state => ({
    locale: state.app.locale,
    translations: state.app.translations,
    antdLocales: state.app.antdLocales,
});
const LocaleWrapper = connect(mapStateToProps, null)(toJS(Locale));
export default LocaleWrapper;
