import React, { Component } from 'react';
import InputBox from '../UI/InputBox/InputBox';
import Button from '../UI/Button/Button';
import Card from '../Card/Card';

class CardForm extends Component{
    constructor(props)
    {
        super(props)
        const currYr=(new Date().getFullYear() -1);
        let optionsmonth=[]
        let optionsyear=[]
        for (let i = 1; i < 13; i++) {
            let t=i
            if(i<10)
            t=`0${i}`
            optionsmonth.push({
                value: t,
                displayValue:t
            });
            optionsyear.push({
                value: currYr + i,
                displayValue: currYr + i
            });
        }
        this.state={
            cardForm:{
                cardnumber:{
                    elementType:'input',
                    elementConfig:{
                        type:'tel',
                        maxLength:'16',
                        required:true
                    },
                    label:'Card Number',
                    value:''
                },
                cardname:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        maxLength:'100',
                        required:true
                    },
                    label:'Card Name',
                   value:''
                },
                expirymonth:{
                    elementType:'select',
                    elementConfig:{
                        options: optionsmonth,
                        default:'Month'
                    },
                    label:'Expiration Date',
                   value:''
                },
                expiryyear:{
                    elementType:'select',
                    elementConfig:{
                        options: optionsyear,
                        default:'Year'
                    },
                   value:''
                },
                cardcvv:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        minLength:'3',
                        maxLength:'4',
                        required:true,
                        name:'cvvNo'
                    },
                    label:'CVV',
                   value:''
                },
            },
            focusedElement:''

        }
    }
    inputChangeHandle=(e,id) =>{
        
        e.preventDefault();
        const updatedForm={ ...this.state.cardForm}
        let updatedElement={...updatedForm[id]}
        let val=e.target.value
        if(id==='cardnumber' || id==='cardcvv')
        {
            if(/^[0-9]*$/.test(val))
            {
                updatedElement.value=val
                updatedForm[id]=updatedElement
                this.setState({cardForm:updatedForm})
            }
        }
        
        else{
            updatedElement.value=val
            updatedForm[id]=updatedElement
            this.setState({cardForm:updatedForm})
        }
    }

    inputFocusHandle=(e,id) =>{
        e.preventDefault();
        this.setState({focusedElement:id})
    }
    
    render(){
        const formArray = [];
        for (let key in this.state.cardForm) {
            formArray.push({
                id: key,
                config: this.state.cardForm[key]
            });
        }
        const {cardnumber,cardname,expirymonth,expiryyear,cardcvv} =this.state.cardForm
        return(
            <div className="cardFormWrap">
                <Card 
                cardnum={cardnumber.value}
                cardname={cardname.value.toUpperCase()}
                exmonth={expirymonth.value}
                exyear={expiryyear.value}
                cvv={cardcvv.value}
                focusedElement={this.state.focusedElement}
                />
                <form>
                    <div>
                    {
                        formArray.map((formElement,index) => (
                                <InputBox 
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                label={formElement.config.label}
                                value={formElement.config.value}
                                changed={(event) => this.inputChangeHandle(event,formElement.id)}
                                keypress={(event) => this.inputKeyHandle(event,formElement.id)}
                                focus={(event) => this.inputFocusHandle(event,formElement.id)}
                            />
                            
                        ))
                    }
                    </div>
                    <Button>Submit</Button>
                </form>
            </div>
        )
    }
}
export default CardForm
