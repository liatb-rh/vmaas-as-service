import { useEffect } from 'react'
import { CrownIcon } from '@patternfly/react-icons/dist/esm/icons/crown-icon'
import { UserIcon } from '@patternfly/react-icons/dist/esm/icons/user-icon'
import { UsersIcon } from '@patternfly/react-icons/dist/esm/icons/users-icon'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Content,
  Title,
  ToggleGroup,
  ToggleGroupItem,
} from '@patternfly/react-core'
import { MoonIcon } from '@patternfly/react-icons/dist/esm/icons/moon-icon'
import { SunIcon } from '@patternfly/react-icons/dist/esm/icons/sun-icon'

export type OsacLandingPageProps = {
  isDarkTheme: boolean
  onSelectLightTheme: () => void
  onSelectDarkTheme: () => void
  onEnterProviderAdmin: () => void
  onEnterTenantAdmin: () => void
  onEnterTenantUser: () => void
}

const roleCards: {
  title: string
  description: string
  Icon: typeof CrownIcon
  onEnter: keyof Pick<
    OsacLandingPageProps,
    'onEnterProviderAdmin' | 'onEnterTenantAdmin' | 'onEnterTenantUser'
  >
}[] = [
  {
    title: 'Provider Admin',
    description:
      'Manage platform services, tenants, and global policies for the OSAC environment.',
    Icon: CrownIcon,
    onEnter: 'onEnterProviderAdmin',
  },
  {
    title: 'Tenant Admin',
    description:
      'Configure organization resources, users, quotas, and shared services.',
    Icon: UsersIcon,
    onEnter: 'onEnterTenantAdmin',
  },
  {
    title: 'Tenant User',
    description:
      'Access the VM-as-a-Service workspace to create and manage your virtual machines.',
    Icon: UserIcon,
    onEnter: 'onEnterTenantUser',
  },
]

export function OsacLandingPage({
  isDarkTheme,
  onSelectLightTheme,
  onSelectDarkTheme,
  onEnterProviderAdmin,
  onEnterTenantAdmin,
  onEnterTenantUser,
}: OsacLandingPageProps) {
  const handlers = {
    onEnterProviderAdmin,
    onEnterTenantAdmin,
    onEnterTenantUser,
  }

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      className="osac-landing"
      style={{
        height: '100dvh',
        maxHeight: '100dvh',
        width: '100%',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundColor: 'var(--pf-t--global--background--color--primary--default)',
        color: 'var(--pf-t--global--text--color--regular)',
      }}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingInline: 'var(--pf-t--global--spacer--lg)',
          paddingTop: 'var(--pf-t--global--spacer--md)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '72rem',
            gap: 'var(--pf-t--global--spacer--xl)',
          }}
        >
          <div style={{ maxWidth: '40rem' }}>
            <Title headingLevel="h1" size="4xl">
              Welcome to OSAC
            </Title>
            <Content
              component="p"
              style={{
                marginTop: 'var(--pf-t--global--spacer--md)',
                fontSize: 'var(--pf-t--global--font--size--body--lg)',
                color: 'var(--pf-t--global--text--color--subtle)',
              }}
            >
              Select your role to access the customized interface.
            </Content>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: 'var(--pf-t--global--spacer--md)',
              width: '100%',
            }}
          >
            {roleCards.map(({ title, description, Icon, onEnter }) => (
              <div
                key={title}
                style={{
                  flex: '1 1 16rem',
                  maxWidth: '22rem',
                  minWidth: 'min(100%, 16rem)',
                }}
              >
                <Card isFullHeight id={`osac-role-${title.replace(/\s+/g, '-').toLowerCase()}`}>
                  <CardBody>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: 'var(--pf-t--global--spacer--md)',
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 'var(--pf-t--global--border--radius--medium)',
                          backgroundColor:
                            'var(--pf-t--global--background--color--secondary--default)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon
                          aria-hidden
                          style={{
                            width: 26,
                            height: 26,
                            color: 'var(--pf-t--global--icon--color--regular)',
                          }}
                        />
                      </div>
                    </div>
                    <CardTitle style={{ textAlign: 'center' }}>{title}</CardTitle>
                    <Content
                      component="p"
                      style={{
                        marginTop: 'var(--pf-t--global--spacer--sm)',
                        textAlign: 'center',
                        color: 'var(--pf-t--global--text--color--subtle)',
                      }}
                    >
                      {description}
                    </Content>
                  </CardBody>
                  <CardFooter style={{ justifyContent: 'center' }}>
                    <Button variant="primary" onClick={() => handlers[onEnter]()}>
                      Enter
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBlock: 'var(--pf-t--global--spacer--md)',
          paddingInline: 'var(--pf-t--global--spacer--lg)',
        }}
      >
        <ToggleGroup aria-label="Color theme">
          <ToggleGroupItem
            icon={<SunIcon />}
            aria-label="Light mode"
            isSelected={!isDarkTheme}
            onChange={(_event, selected) => selected && onSelectLightTheme()}
          />
          <ToggleGroupItem
            icon={<MoonIcon />}
            aria-label="Dark mode"
            isSelected={isDarkTheme}
            onChange={(_event, selected) => selected && onSelectDarkTheme()}
          />
        </ToggleGroup>
      </div>
    </div>
  )
}
