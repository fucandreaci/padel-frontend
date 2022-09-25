import React from 'react';
import './selectData.scss'
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

interface SelectDataProps {
    selectedItem?: SelectItem,
    setSelectedItem: (item?: SelectItem) => void,
    items: SelectItem[],
    error: boolean,
    label: string,
    id: string,
}

export interface SelectItem {
    id: number,
    value: string
}

const componentClassName = 'select-campi';

export const SelectData = (props: SelectDataProps) => {
    // const dispatch = useAppDispatch();


    const handleOnChange = (event: SelectChangeEvent<number>) => {
        const selectedItem = props.items.find(item => item.id === event.target.value);
        props.setSelectedItem(selectedItem);
    }

    return (
        <div className={`${componentClassName}`}>
            <FormControl margin={'dense'} fullWidth>
                <InputLabel id={props.id + '-label'}>{props.label}</InputLabel>
                <Select
                    labelId={props.id + '-label'}
                    id={props.id}
                    value={props.selectedItem?.id || ''}
                    label={props.label}
                    onChange={handleOnChange}
                    error={props.error}
                >
                    <MenuItem selected={!props.selectedItem} disabled={true}>{props.label}</MenuItem>
                    {
                        props.items.map(item => (
                            <MenuItem key={item.id} value={item.id}>{item.value}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
};
