/* eslint-disable */
import React, {Component} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete,  FormControl,  Rating, TextField, Typography } from '@mui/material';
import { generate, getAPIAndValue, selectn } from '../Utils/Utils';

const drawerWidth = 350;
export default class RightPanel extends Component {
    constructor(props){
      super(props);
      this.state = {
        rightPanelObject: props.rightPanelObj,
        loading: false,
        id: props.recordId
      }
      this.setLoading = this.setLoading.bind(this)
      this.setRightPanelObject = this.setRightPanelObject.bind(this)
      this.setId = this.setId.bind(this)
      this.getField = this.getField.bind(this)
      this.getListItems = this.getListItems.bind(this)
      this.changeFormDetails = this.changeFormDetails.bind(this)
      this.submitClick = this.submitClick.bind(this)
    }
    setLoading(type){
      this.setState({
        loading: type
      })
    }
    setRightPanelObject(Obj){
      this.setState({
        rightPanelObject: {...Obj}
      })
    }
    setId(id){
      this.setState({
        id
      })
    }
    componentDidUpdate(prevProps,prevStat){
      if(prevProps.recordId != this.props.recordId){
        const { rightPanelObj } = this.props;
        this.setId(this.props.recordId)
        this.setRightPanelObject(rightPanelObj) 
      }
    }
    getField(key){
      const { rightPanelObject } = this.state;
      let {
        type,
        value,
        fieldName,
        apiName
      } = rightPanelObject[key] || {};
      const onChange = (e, val) =>{
        const value = selectn('target.value',e) || val;
        rightPanelObject[key].value = typeof value == 'string' ? value.trim() : value;
        this.setRightPanelObject({...rightPanelObject})
      }
      if(type == 'autocompleteText'){
        return (
          <Autocomplete
            value={value}
            disableClearable
            id={apiName}
            options={this.props[apiName] || []}
            sx={{ width: 300 }}
            freeSolo
            onChange={apiName == 'name' ? this.changeFormDetails : onChange}
            renderInput={(params) => <TextField {...params} onChange={onChange} label={fieldName} variant="standard" />}
            />
        )
      }else if(type == 'rating'){
        return (
          <React.Fragment>
            <Typography component="legend">{fieldName}</Typography>
            <Rating name={fieldName} onChange={onChange} value={value} />
          </React.Fragment>
        )
      }else if(type == 'url' || type == 'imageLink'){
        return (
          <TextField  sx={{ width: 300 }} onChange={onChange} value={value} label={fieldName} variant="standard" />
        )
      }
    }
    getListItems(){
      const { rightPanelObject } = this.state;
      const rightPanelKeys = Object.keys(rightPanelObject);
      const listArr = [];
      const getList = (key)=>{
          return (
            <Box
              sx={{ width: drawerWidth,p: 2 }}
              role="presentation"
            >
            {
              this.getField(key)
            }
             </Box>
          )
      }
      for(let i=0;i<rightPanelKeys.length;i++){
          listArr.push(getList(rightPanelKeys[i]));
      }
      return listArr;
    }
     changeFormDetails(e,obj){
      const { openForm } = this.props;   
      const { id } = obj || {};
      id && openForm('editForm',{'recordId':id})
    }
    submitClick(){
      const { rightPanelObject } = this.state;
      const { formType, submitForm } = this.props;
      this.setLoading(true);
      this.setRightPanelObject(rightPanelObject)
      submitForm(getAPIAndValue(rightPanelObject,'apiName','value'), this.setLoading, formType);
    }
    render(){
      const { 
        formType, 
        closeForm
      } = this.props;
      const { loading } = this.state;
     
    const drawer = (
      <div>
        <List dense={true}>
              {generate(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="close" onClick={closeForm}>
                      <CloseIcon/>
                    </IconButton>
                  }
                >
                    <Typography gutterBottom variant="h5" component="div">
                      {formType == 'editForm' ? 'Edit Form' : 'Add Form'}
                    </Typography>
                </ListItem>
              )}
            </List>
        <FormControl sx={{height: 850}}>
          {this.getListItems()}
        </FormControl>
        <Box
          sx={{ p: 1 }}
        >
          <LoadingButton
            fullWidth
            color="secondary"
            onClick={this.submitClick}
            sx={{ p: 1, mb:0 }}
            loading={loading}
            variant="contained"
          >
            <span>{formType == 'editForm' ? 'Update' : 'Submit'}</span>
          </LoadingButton>
        </Box>
      </div>
    );
  
    return (
      <React.Fragment key={'right'}>
        <Drawer
          anchor={'right'}
          open={formType}
          onClose={closeForm}
        >
          {drawer}
        </Drawer>
      </React.Fragment>
    )
  }
}
