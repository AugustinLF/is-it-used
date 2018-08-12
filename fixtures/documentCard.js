// @flow
import * as React from 'react';

import {ThemeColoredText, Text, Padded, Flex, Card, Icon} from '@vamos/base-components';
import {DatedMessage} from '@life/components/generics';
import {Link} from '@life/components/links';

import getMessages from '@life/intl';
import type {EmployeeT, State} from '@life/src/types';

import type {DocumentT} from '@life/entities/documents/models';

const msg = getMessages('documents');

type Props = {
    employeeValidator: EmployeeT,
    item: DocumentT,
};

export const DocumentCard = ({item, employeeValidator}: Props) => (
    <Link route={''}>
        <Card>
            <Flex justifyContent="space-between" alignItems="flex-start">
                <Icon themeColored type="assignment" size="veryLarge" />
                <ThemeColoredText bold textTransform="uppercase">
                    {item.documentType === 'annualReport' ? msg.annualReportType : msg.hrFollowUp}
                </ThemeColoredText>
            </Flex>
            <Padded top>
                <Text size="large">Document Type</Text>
                <DatedMessage
                    message={msg.validateBy}
                    firstname={employeeValidator.firstname}
                    lastname={employeeValidator.lastname}
                    date={item.validationDate}
                />
            </Padded>
        </Card>
    </Link>
);

export default DocumentCard;
