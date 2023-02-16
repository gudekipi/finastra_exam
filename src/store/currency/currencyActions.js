import { getCurrencies as getCurrenciesAPI , getConversion as getConversionAPI} from '../../api/currency';
import { fetchCurrencies, fetchCurrenciesSuccess, fetchCurrenciesFailure, fetchConversion, fetchConversionFailure, fetchConversionSuccess } from './currencyReducer';

export const getCurrencies = () => async (dispatch) => {
  dispatch(fetchCurrencies());
  try {
    const currencies = await getCurrenciesAPI();
    dispatch(fetchCurrenciesSuccess(currencies));
  } catch (error) {
    dispatch(fetchCurrenciesFailure(error.message));
  }
};

export const getConversion = (from,to) => async (dispatch) => {
    dispatch(fetchConversion());
    try {
      const conversion = await getConversionAPI(from,to);
      dispatch(fetchConversionSuccess(conversion));
    } catch (error) {
      dispatch(fetchConversionFailure(error.message));
    }
};

