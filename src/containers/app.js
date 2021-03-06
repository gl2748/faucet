import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import enUS from 'antd/lib/locale-provider/en_US';
import frFR from 'antd/lib/locale-provider/fr_FR';
import getTranslations, { getAvailableLocale } from '../utils/locales';
import * as actions from '../actions/appLocale';
import '../styles/common.less';

const antdLocales = { en: enUS, fr: frFR, default: enUS };

@connect(
    state => ({
        locale: state.appLocale.locale,
    }),
    dispatch =>
        bindActionCreators(
            {
                setLocale: actions.setLocale,
            },
            dispatch
        )
)
export default class App extends Component {
    static propTypes = {
        children: React.PropTypes.element.isRequired,
        locale: React.PropTypes.string.isRequired,
        setLocale: React.PropTypes.func.isRequired,
    };

    componentWillMount() {
        const { locale: appLocale, setLocale } = this.props;
        const locale = getAvailableLocale(appLocale);
        setLocale(locale);
    }

    render() {
        const { locale, children } = this.props;
        let defaultLocale = locale;
        if (locale === 'auto') {
            defaultLocale = getAvailableLocale(locale);
        }
        const translations = getTranslations(defaultLocale);
        const antdLocale = antdLocales[defaultLocale] || antdLocales.default;
        return (
            <IntlProvider locale={defaultLocale} messages={translations}>
                <LocaleProvider locale={antdLocale}>
                    <div className="main">{children}</div>
                </LocaleProvider>
            </IntlProvider>
        );
    }
}
