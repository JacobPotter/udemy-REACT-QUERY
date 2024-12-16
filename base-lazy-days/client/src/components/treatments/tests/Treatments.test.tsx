import { render, screen } from '@/test-utils'

import { Treatments } from '../Treatments'

test('renders response from query', async () => {
    render(<Treatments />)

    const treatmentTitles = await screen.findAllByRole('heading', {
        name: /scrub|facial|massage/i,
    })
    expect(treatmentTitles).toHaveLength(3)
})
