import {cleanup, render, screen} from '@testing-library/react';
import HeaderStats from '../Home/Headers/HeaderStats'

test('should render header stat component',()=>{
    render(<HeaderStats/>)
    const header  = screen.getByTestId('header-stats');
    expect(header).toBeInTheDocument();
})