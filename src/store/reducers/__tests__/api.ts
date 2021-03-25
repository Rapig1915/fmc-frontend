import api from '../api';
import {
  API_CALL_FAILURE,
  API_CALL_START,
  API_CALL_SUCCESS,
} from '../../types';

describe('API Reducer', () => {
  it('should return the initial state', () => {
    expect(
      api(undefined, {
        type: 'UNDEFINED',
        payload: undefined,
      })
    ).toEqual({});
  });

  it(`should handle ${API_CALL_START}`, () => {
    expect(
      api(
        {},
        {
          type: API_CALL_START,
          payload: {
            api: 'TEST_API',
          },
        }
      )
    ).toEqual({
      TEST_API: {
        inProgress: true,
        error: '',
      },
    });
  });

  it(`should handle ${API_CALL_SUCCESS}`, () => {
    expect(
      api(
        {
          TEST_API: {
            inProgress: true,
            error: '',
          },
        },
        {
          type: API_CALL_SUCCESS,
          payload: {
            api: 'TEST_API',
          },
        }
      )
    ).toEqual({
      TEST_API: {
        inProgress: false,
        error: '',
      },
    });
  });

  it(`should handle ${API_CALL_FAILURE}`, () => {
    expect(
      api(
        {
          TEST_API: {
            inProgress: true,
            error: '',
          },
        },
        {
          type: API_CALL_FAILURE,
          payload: {
            api: 'TEST_API',
            error: 'Some error',
          },
        }
      )
    ).toEqual({
      TEST_API: {
        inProgress: false,
        error: 'Some error',
      },
    });
  });

  it('should return current state', () => {
    const state = {
      API: {
        inProgress: true,
        error: '',
      },
    };

    expect(
      api(state, {
        type: 'UNKNOWN_TYPE',
        payload: {},
      })
    ).toEqual(state);
  });
});
