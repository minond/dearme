import * as React from 'react';

type Props = {
    guid: string;
};

export const JournalComponent = ({ guid }: Props) =>
    <div>
        {guid}
    </div>;
