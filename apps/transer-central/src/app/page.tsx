import { Button, Card } from '@transer/ui';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-red-900 mb-8">
          Transer Central - Admin Dashboard
        </h1>
        
        <Card className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
          <p className="text-gray-600 mb-4">
            Manage video content for your users. Upload, edit, and organize videos that will be
            available in the mobile app.
          </p>
          <Button variant="primary">Get Started</Button>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-xl font-semibold mb-2">Videos</h3>
            <p className="text-gray-600 mb-4">Manage your video library</p>
            <Button variant="secondary" size="sm">View Videos</Button>
          </Card>
          
          <Card>
            <h3 className="text-xl font-semibold mb-2">Upload</h3>
            <p className="text-gray-600 mb-4">Add new video content</p>
            <Button variant="secondary" size="sm">Upload Video</Button>
          </Card>
          
          <Card>
            <h3 className="text-xl font-semibold mb-2">Settings</h3>
            <p className="text-gray-600 mb-4">Configure your preferences</p>
            <Button variant="secondary" size="sm">Open Settings</Button>
          </Card>
        </div>
      </div>
    </main>
  );
}
