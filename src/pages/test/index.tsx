import { Button, Notification } from '@/components/baseComponents/Button';
import Icon from '@/components/baseComponents/IconWrapper';
import Select from '@/components/baseComponents/Select';
import TextField from '@/components/baseComponents/TextField';
import Typography from '@/components/baseComponents/Typography';
import { DatePicker } from '@/components/baseComponents/DatePickers';
import Textarea from '@/components/baseComponents/Textarea';
import Checkbox from '@/components/baseComponents/Checkbox';
import Label from '@/components/baseComponents/Label';
import SearchField from '@/components/mainComponents/SearchField';
// ----------------------------------------------------------------------

const Test = () => {
  const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
  ];

  return (
    <div>
      <Typography variant="h1">Test components</Typography>

      <div className="grid grid-cols-12 gap-2 px-4 my-11 md:px-7">
        <div className="flex flex-col gap-2 col-span-full sm:col-span-3 lg:col-span-2">
          <Typography variant="h2" className="mb-7">
            Typograpy
          </Typography>

          <div className="flex flex-col gap-4">
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="body">Body</Typography>
            <Typography variant="button1">Button 1</Typography>
            <Typography variant="button2">Button 2</Typography>
            <Typography variant="caption">Caption</Typography>
            <Typography variant="left-menu">left menu</Typography>
            <Typography variant="small-text">small text</Typography>
          </div>
        </div>

        <div className="flex flex-col gap-2 col-span-full sm:col-span-3">
          <Typography variant="h2" className="mb-7">
            Button
          </Typography>

          <Button className="px-30">Primary button</Button>
        </div>

        <div className="flex flex-col gap-8 col-span-full lg:col-span-4">
          <Typography variant="h2" className="mb-7">
            Forms
          </Typography>

          <TextField placeholder="Placeholder" />
          <TextField placeholder="Password" type="password" />
          <TextField
            placeholder="Placeholder"
            type="number"
            startAdornment={<Icon name="money" className="w-auto" />}
            startAdornmentType="fill"
          />

          <Select
            options={[
              { value: '1', label: 'test1' },
              { value: '2', label: 'test2' },
            ]}
          />
          <Select
            options={[
              { value: '1', label: 'test1' },
              { value: '2', label: 'test2' },
            ]}
            isMulti
          />

          <Textarea placeholder="Description" rows={5} />

          <DatePicker />

          <SearchField options={people} filterKey="name" />
        </div>

        <div className="flex flex-col gap-2 col-span-full lg:col-span-4">
          <Typography variant="h2" className="mb-7">
            Checkbox and Notifications
          </Typography>

          <div className="flex items-start">
            <Checkbox defaultChecked className="mr-4" />
            <Checkbox className="mr-10" />

            <Checkbox variant="inherit" className="mr-4" inputSize="small" />
            <Checkbox
              variant="inherit"
              className="mr-10"
              defaultChecked
              inputSize="small"
            />

            <Notification className="mr-4" />
            <Notification label={10} />
          </div>
        </div>

        <div className="flex flex-col gap-2 col-span-full lg:col-span-3">
          <Typography variant="h2" className="mb-7">
            Progress
          </Typography>

          <div>
            <Label
              className="mr-4"
              color="success"
              title="ON TRACK"
              size="small"
            />
            <Label
              className="mr-4"
              color="warnning"
              title="IN DANGER"
              size="small"
            />
            <Label
              className="mr-4"
              color="danger"
              title="OFF TRACK"
              size="small"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-full lg:col-span-3">
          <Typography variant="h2" className="mb-7">
            Status
          </Typography>

          <div>
            <Label className="mr-4" color="success" title="Active" />
            <Label className="mr-4" color="danger" title="Inactive" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
