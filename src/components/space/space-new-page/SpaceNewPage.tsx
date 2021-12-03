import Layout from '../../layout/Layout'
import CardEdit from '../../common/card-edit/CardEdit'

const SpaceNewPage = () => {
    return (
        <Layout>
            <CardEdit
                title={'New space'}
                saveButton={'Create space'}
                cancelButton={'Reset form'}
            />
        </Layout>
    )
}

export default SpaceNewPage
