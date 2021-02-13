import { connect } from 'react-redux';
export const Connect = connect;
const initialState = {
    User: '',
    Books:[],
    Recent:{
        activities:[],
        books:[],
        users:[]
    }
}
export const reducer = (state = initialState, action) => {
    const { field, val, type } = action;
    if (type === 'setByField')
        return { ...state, [field]: val }
    else if (type === 'logOut')
        return initialState
    return state;
}
export const mapStateToProps = (state) => {
    return { User, Books, Recent } = state;
}

export const mapDispatchToProps = (dispatch) => {
    return {
        setByField: (field, val) => dispatch({ type: 'setByField', field, val }),
        logOut: () => dispatch({ type: 'logOut' })
    };
}